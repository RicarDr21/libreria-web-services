from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField


class Libro(models.Model):
    id = ObjectIdAutoField(primary_key=True)
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=150)

    class Meta:
        db_table = "libros"

    def __str__(self):
        return self.titulo
