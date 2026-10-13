from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Libro
from .serializers import LibroSerializer


class LibrosView(APIView):
    @extend_schema(responses={200: LibroSerializer(many=True)})
    def get(self, request):
        return Response(LibroSerializer(Libro.objects.all(), many=True).data)

    @extend_schema(request=LibroSerializer, responses={201: LibroSerializer, 400: None})
    def post(self, request):
        serializer = LibroSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LibroView(APIView):
    @extend_schema(responses={204: None, 404: None})
    def delete(self, request, id):
        libro = Libro.objects.filter(pk=id).first() if len(id) == 24 else None
        if libro is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        libro.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
