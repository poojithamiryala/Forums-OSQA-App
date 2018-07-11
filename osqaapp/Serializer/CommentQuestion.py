from rest_framework import serializers
from osqaapp.models import *


class CommentQuestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentQuestion
        fields = ['id', 'postquestion_id', 'user_id', 'text']

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance


