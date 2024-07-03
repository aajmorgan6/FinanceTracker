from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from expenses.serializers import ExpenseSerializer, PaymentTypeSerializer
from expenses.models import Expense, PaymentType
from dateutil import parser
from datetime import date, timedelta, datetime
# Create your views here.

def format_data(data):
    total = 0.0
    for date in data:
        tmp = parser.parse(date['date'])
        date['date'] = tmp.strftime('%b %d, %Y at %I:%M %p')
        total += date['amount']
    return data

@csrf_exempt
def expense_list(request):
    """
    For GET --> return all expenses
    For POST --> add a new item
    """
    if request.method == 'GET':
        data = format_data(data=ExpenseSerializer(Expense.objects.all(), many=True).data)
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        data['date'] = datetime.strptime(f'{data["date"]} {data["time"]}', '%Y-%m-%d %H:%M:%S')
        del(data["time"])
        serializer = ExpenseSerializer(data=data)
        print(data)
        if serializer.is_valid():
            serializer.save()
            data = format_data(data=ExpenseSerializer(Expense.objects.all(), many=True).data)
            return JsonResponse(data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


def get_last_pk(request, pk):
    if request.method == 'GET':
        today = date.today()
        last_week = today - timedelta(days=pk)
        data = Expense.objects.filter(date__range=[last_week,today+timedelta(days=1)])
        data = format_data(data=ExpenseSerializer(data, many=True).data)
        return JsonResponse(data, safe=False)


@csrf_exempt
def expense_detail(request, pk):
    """
    For GET --> returns specific item's data
    For PUT --> edits specific item's data
    For DELETE --> delete an expense
    """
    try:
        expense = Expense.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return HttpResponse(status=400)

    if request.method == 'GET':
        serializer = ExpenseSerializer(expense)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ExpenseSerializer(expense, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        expense.delete()
        return JsonResponse(data=format_data(data=ExpenseSerializer(Expense.objects.all(), many=True).data), safe=False)


@csrf_exempt
def get_payment_types(request):
    if request.method == "GET":
        objects = PaymentType.objects.all() # will filter for users
        data = PaymentTypeSerializer(objects, many=True).data
        return JsonResponse({'data': data}, status=200, safe=False)
    elif request.method == "POST":
        data = JSONParser().parse(request)
        print(data)
        serializer = PaymentTypeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            data = PaymentTypeSerializer(PaymentType.objects.all(), many=True).data
            return JsonResponse({'data': data}, status=200, safe=True)
    return HttpResponse(status=401)
