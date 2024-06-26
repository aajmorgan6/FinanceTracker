# Generated by Django 5.0.6 on 2024-06-27 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_type', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='expense',
            name='payment_type',
            field=models.CharField(default='Cash', max_length=100),
        ),
    ]
