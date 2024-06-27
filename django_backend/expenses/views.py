from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from expenses.serializers import ExpenseSerializer, PaymentTypeSerializer
from expenses.models import Expense, PaymentType
from dateutil import parser
# Create your views here.

def get_all_data():
    data = ExpenseSerializer(Expense.objects.all(), many=True).data
    for date in data:
        tmp = parser.parse(date['date'])
        date['date'] = tmp.strftime('%Y-%m-%d %H:%M')

    return data

@csrf_exempt
def expense_list(request):
    """
    For GET --> return all expenses
    For POST --> add a new item
    """
    # TODO: all payment types become cash for some reason
    if request.method == 'GET':
        data = get_all_data()
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ExpenseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            data = get_all_data()
            return JsonResponse(data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


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
        return HttpResponse(status=204)


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