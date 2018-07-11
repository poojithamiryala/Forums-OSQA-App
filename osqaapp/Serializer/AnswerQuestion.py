from rest_framework import serializers
from osqaapp.models import *
from datetime import datetime


class AnswerQuestionModelSerializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(required=False)
    votecount = serializers.IntegerField(required=False)

    class Meta:
        model = AnswerQuestion
        fields = ['id', 'postquestion_id', 'user_id', 'text','time','votecount']

    def create(self, validated_data):
        album = AnswerQuestion.objects.create(**validated_data,time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),votecount=0)
        t1 = PostQuestion.objects.get(pk=validated_data['postquestion_id'])
        t1.answercount = t1.answercount + 1
        t1.save()
        return album

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance


class AnswersCountModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ViewsCount
        fields = ['postquestion_id', 'count']