from django.db import models

# Create your models here.

class Expense(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    amount = models.FloatField(blank=False)
    reason = models.CharField(max_length=200, default='', blank=True)

    class Meta:
        ordering = ['date']