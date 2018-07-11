from rest_framework import serializers
from osqaapp.models import *


class VotesModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = VoteQuestion
        fields = ['postquestion_id', 'user_id']

    def create(self, validated_data):
        album = VoteQuestion.objects.create(**validated_data)
        t = VotesCount.objects.get(postquestion_id=validated_data['postquestion_id'])
        t.count = t.count+1
        t.save()
        t1 = PostQuestion.objects.get(pk=validated_data['postquestion_id'])
        t1.votecount = t1.votecount + 1
        t1.save()
        return album


class VotesCountModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = VotesCount
        fields = ['postquestion_id','count']


class VotesAnswerModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = VoteAnswer
        fields = ['answerquestion_id', 'user_id']

    def create(self, validated_data):
        album = VoteAnswer.objects.create(**validated_data)
        t1 = AnswerQuestion.objects.get(pk=validated_data['answerquestion_id'])
        t1.votecount = t1.votecount + 1
        t1.save()
        return album
