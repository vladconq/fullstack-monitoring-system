from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Limitation
from .serializers import LimitationSerializer


@api_view(['GET'])
def get_existing_limitations(request, type_of_technological_section):
    limitations = Limitation.objects.filter(type_of_technological_section=type_of_technological_section)
    serializer = LimitationSerializer(limitations, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def update_limitation(request, id_sautcom):
    limitation = Limitation.objects.get(id_sautcom=id_sautcom)
    serializer = LimitationSerializer(instance=limitation, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def create_limitation(request):
    serializer = LimitationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_limitation(request, id_sautcom):
    limitation = Limitation.objects.get(id_sautcom=id_sautcom)
    limitation.delete()
    return Response('Item deleted')
