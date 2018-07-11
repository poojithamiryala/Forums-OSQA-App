from rest_framework import serializers
from osqaapp.models import *


class ViewsModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ViewQuestion
        fields = ['postquestion_id', 'user_id']

    def create(self, validated_data):
        album = ViewQuestion.objects.create(**validated_data)
        t = ViewsCount.objects.get(postquestion_id=validated_data['postquestion_id'])
        t.count = t.count+1
        t.save()
        t1 = PostQuestion.objects.get(pk=validated_data['postquestion_id'])
        t1.viewcount = t1.viewcount + 1
        t1.save()
        return album


class ViewsCountModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ViewsCount
        fields = ['postquestion_id', 'count']
