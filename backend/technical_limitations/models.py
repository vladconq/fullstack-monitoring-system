from django.db import models


class Limitation(models.Model):
    id_sautcom = models.CharField(max_length=20, unique=True, null=False)
    type_of_technological_section = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=100, null=False)
    min_limit = models.FloatField(null=False)
    max_limit = models.FloatField(null=False)
    averaging = models.IntegerField(null=False)
    date_begin = models.DateField(null=True)
    date_end = models.DateField(null=True)

    def __str__(self):
        return self.id_sautcom
