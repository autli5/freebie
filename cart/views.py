from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer


def get_or_create_cart(request):
    """Получить или создать корзину по сессии"""
    if not request.session.session_key:
        request.session.create()
    
    session_key = request.session.session_key
    cart = Cart.objects.filter(session_key=session_key).first()
    
    if not cart:
        cart = Cart.objects.create(
            session_key=session_key,
            user=request.user if request.user.is_authenticated else None
        )
    
    return cart


@method_decorator(csrf_exempt, name='dispatch')
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    
    # ВАЖНО: Отключаем аутентификацию для этого ViewSet, 
    # чтобы DRF не требовал CSRF-токен для POST-запросов
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Cart.objects.filter(user=self.request.user)
        return Cart.objects.none()

    @action(detail=False, methods=['get'])
    def my_cart(self, request):
        cart = get_or_create_cart(request)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart = get_or_create_cart(request)
        
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        size = request.data.get('size', '')
        color = request.data.get('color', '')

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product_id=product_id,
            size=size,
            color=color,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def update_item(self, request):
        cart = get_or_create_cart(request)
        
        item_id = request.data.get('item_id')
        quantity = request.data.get('quantity')

        try:
            cart_item = CartItem.objects.get(cart=cart, id=item_id)
            cart_item.quantity = quantity
            cart_item.save()
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)

        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def remove_item(self, request):
        cart = get_or_create_cart(request)
        
        item_id = request.data.get('item_id')

        CartItem.objects.filter(cart=cart, id=item_id).delete()

        serializer = self.get_serializer(cart)
        return Response(serializer.data)