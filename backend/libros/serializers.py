from rest_framework import serializers

from .models import Libro


class LibroSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Libro
        fields = ("id", "titulo", "autor")
