from django.db import models

# Create your models here.

class Expense(models.Model):
    date = models.DateTimeField()
    amount = models.FloatField(blank=False)
    reason = models.CharField(max_length=200, default='', blank=True)
    payment_type = models.CharField(max_length=100, default='Cash', blank=False)
    # user = models.CharField() # for future use

    class Meta:
        ordering = ['date']


class PaymentType(models.Model):
    '''
    Make new one for payment_type in Expense class.
    Will populate a dropdown on frontend, with an option to add a new type.
    '''
    payment_type = models.CharField(max_length=100, blank=False)
    # user = models.CharField() # for future use