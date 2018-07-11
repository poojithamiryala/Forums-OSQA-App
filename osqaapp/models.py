from django.db import models

# Create your models here.
from rest_framework_jwt.serializers import User


class PostQuestion(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=3000)
    tags = models.CharField(max_length=200)
    time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    viewcount = models.IntegerField()
    votecount = models.IntegerField()
    answercount = models.IntegerField()


class TagQuestion(models.Model):
    name = models.CharField(max_length=20)
    postquestion = models.ForeignKey(PostQuestion,on_delete=models.CASCADE)


class ViewQuestion(models.Model):
    postquestion = models.ForeignKey(PostQuestion, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class VoteQuestion(models.Model):
    postquestion = models.ForeignKey(PostQuestion, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class CommentQuestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    postquestion = models.ForeignKey(PostQuestion, on_delete=models.CASCADE)
    text = models.CharField(max_length=1024)


class AnswerQuestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    postquestion = models.ForeignKey(PostQuestion, on_delete=models.CASCADE)
    text = models.CharField(max_length=1024)
    time = models.DateTimeField(default="2018-07-02 10:55:06")
    votecount=models.IntegerField(default=0)


class VoteAnswer(models.Model):
    answerquestion = models.ForeignKey(AnswerQuestion, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class ViewsCount(models.Model):
    postquestion = models.ForeignKey(PostQuestion, on_delete=models.CASCADE)
    count = models.IntegerField()


class VotesCount(models.Model):
    postquestion = models.ForeignKey(PostQuestion, on_delete=models.CASCADE)
    count = models.IntegerField()


class TagCount(models.Model):
    name=models.CharField(max_length=20)
    postquestionid=models.CharField(max_length=1000)
    count=models.IntegerField()