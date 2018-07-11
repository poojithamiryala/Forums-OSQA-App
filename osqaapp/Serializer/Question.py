from rest_framework import serializers
from osqaapp.models import *
from datetime import datetime

class PostModelSerializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(required=False)
    viewcount = serializers.IntegerField(required=False)
    votecount = serializers.IntegerField(required=False)
    answercount = serializers.IntegerField(required=False)
    username = serializers.CharField(max_length=1024,required=False)

    class Meta:
        model = PostQuestion
        fields = ['id','title', 'description', 'tags', 'time', 'user_id', 'viewcount', 'votecount','username','answercount']

    def create(self, validated_data):
        album = PostQuestion.objects.create(**validated_data,time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),viewcount=0,votecount=0,answercount=0)
        for track_data in validated_data['tags'].split(','):
            TagQuestion.objects.create(name=track_data,postquestion=album)
        ViewsCount.objects.create(postquestion=album, count=0)
        VotesCount.objects.create(postquestion=album, count=0)
        return album

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        tag_len = len(instance.tags.split(','))
        instance.tags = validated_data.get('tags', instance.tags)
        tags = TagQuestion.objects.filter(postquestion_id=instance.pk)
        tagname = instance.tags.split(',')
        index = 0
        for tag in tags:
            if len(tagname) < tag_len:
                if index >= len(tagname):
                    tag.delete()
                    continue
            tag.name = tagname[index]
            tag.save()
            index += 1
        if len(tagname) > tag_len:
            while len(tagname)!=index:
                TagQuestion.objects.create(name=tagname[index], postquestion=instance)
                index += 1
        instance.save()
        return instance


class TagModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = TagCount
        fields = ['name','count']


class TagDetailSerializer(serializers.ModelSerializer):
    postquestion = PostModelSerializer()

    class Meta:
        model = TagQuestion
        fields = ['name', 'postquestion']


class UserSerializer(serializers.ModelSerializer):

     class Meta:
         model = User
         fields = ('username', 'id')


class CommentDetailSerializer(serializers.ModelSerializer):
    postquestion = PostModelSerializer()
    user=UserSerializer()

    class Meta:
        model = CommentQuestion
        fields = ['text', 'postquestion','id','user']


class AnswerDetailModelSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    postquestion = PostModelSerializer()

    class Meta:
        model = AnswerQuestion
        fields = ['id', 'postquestion', 'user', 'text','time','votecount']




