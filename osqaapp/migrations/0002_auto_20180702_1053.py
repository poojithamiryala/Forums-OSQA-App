# Generated by Django 2.0.5 on 2018-07-02 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('osqaapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postquestion',
            name='title',
            field=models.CharField(max_length=150),
        ),
    ]