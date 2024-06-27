from django.contrib import admin
from expenses.models import Expense, PaymentType

# Register your models here.
class ExpenseAdmin(admin.ModelAdmin):
    readonly_fields = ('date',)

admin.site.register(Expense, ExpenseAdmin)
admin.site.register(PaymentType)