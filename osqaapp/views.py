from django.db.models import Count
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from osqaapp.Serializer import *
from rest_framework import permissions, status
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model # If used custom user model


from django.contrib.auth import get_user_model

from rest_framework import status, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()

@api_view(['POST'])
def register(request):
    VALID_USER_FIELDS = [f.name for f in get_user_model()._meta.fields]
    DEFAULTS = {
        # you can define any defaults that you would like for the user, here
    }
    serialized = UserSerializer(data=request.DATA)
    if serialized.is_valid():
        user_data = {field: data for (field, data) in request.DATA.items() if field in VALID_USER_FIELDS}
        user_data.update(DEFAULTS)
        user = get_user_model().objects.create_user(
            **user_data
        )
        return Response(UserSerializer(instance=user).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def tag_list(request):
    if request.method == 'GET':
        snippets = TagQuestion.objects.values('name').annotate(count=Count('name'))
        serializer = TagModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)



@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def tag_detail(request,t_name):

    if request.method == 'GET':
        snippet = TagQuestion.objects.filter(name=t_name)
        serializer = TagDetailSerializer(snippet,many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def tagssort(request,t_name,type):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        if type == 'newest':
            snippets = TagQuestion.objects.filter(name=t_name).order_by('-postquestion__time')
            serializer = TagDetailSerializer(snippets, many=True)
            return JsonResponse(serializer.data, safe=False)
        elif type == 'votes' :
            snippets = TagQuestion.objects.filter(name=t_name).order_by('-postquestion__votecount')
            serializer = TagDetailSerializer(snippets, many=True)
            return JsonResponse(serializer.data, safe=False)
        elif type == 'unanswered':
            snippets = TagQuestion.objects.filter(postquestion__answercount=0,name=t_name).order_by('-postquestion__time')
            serializer = TagDetailSerializer(snippets, many=True)
            return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def search_list(request,search):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        # snippets = PostQuestion.objects.filter(title__contains=search) | PostQuestion.objects.filter(description__contains=search) | PostQuestion.objects.filter(tags__contains=search)
        snippets = PostQuestion.objects.filter(title__contains=search) | PostQuestion.objects.filter(
            description__contains=search) | PostQuestion.objects.filter(tags__contains=search)
        serializer = PostModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)




@csrf_exempt
@api_view(['POST', 'GET'])
@permission_classes((IsAuthenticated,))
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = PostQuestion.objects.all()
        serializer = PostModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = PostModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
            serializer.validated_data['username'] = request.user.username
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def questionssort(request,type):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        if type == 'newest':
            snippets = PostQuestion.objects.order_by('-time')
            serializer = PostModelSerializer(snippets, many=True)
            return JsonResponse(serializer.data, safe=False)
        elif type == 'votes' :
            snippets = PostQuestion.objects.order_by('-votecount')
            serializer = PostModelSerializer(snippets, many=True)
            return JsonResponse(serializer.data, safe=False)
        elif type == 'unanswered':
            snippets = PostQuestion.objects.filter(answercount=0).order_by('-time')
            serializer = PostModelSerializer(snippets, many=True)
            return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def tags(request, pk):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = TagQuestion.objects.filter(pk=pk)
        serializer = TagModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def viewsonquestion(request, pk):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = ViewsCount.objects.get(postquestion_id=pk)
        serializer = ViewsCountModelSerializer(snippets)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        t = ViewQuestion.objects.values('postquestion_id').filter(postquestion_id=pk, user=request.user)
        if t:
            return JsonResponse(data={},status=201)
        serializer = ViewsModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['postquestion_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def votesonquestion(request, pk):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = VotesCount.objects.get(postquestion_id=pk)
        serializer = VotesCountModelSerializer(snippets)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        t = VoteQuestion.objects.values('postquestion_id').filter(postquestion_id=pk, user=request.user)
        if t:
            return JsonResponse(data={}, status=201)
        serializer = VotesModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['postquestion_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def votesonanswer(request, pk,pk1):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'POST':
        t = VoteAnswer.objects.values('answerquestion_id').filter(answerquestion_id=pk, user=request.user)
        if t:
            return JsonResponse(data={}, status=201)
        serializer = VotesAnswerModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['answerquestion_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def answerquestion(request, pk):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = AnswerQuestion.objects.filter(postquestion_id=pk)
        serializer = AnswerDetailModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer = AnswerQuestionModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['postquestion_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def questionupdate(request, pk):
        """
        Retrieve, update or delete a code snippet.
        """
        try:
            snippet = PostQuestion.objects.get(pk=pk)
        except Question.DoesNotExist:
            return HttpResponse(status=404)

        if request.method == 'GET':
            snippet = PostQuestion.objects.filter(pk=pk)
            serializer = PostModelSerializer(snippet,many=True)
            return JsonResponse(serializer.data,safe=False)

        elif request.method == 'PUT':
            if not request.user == snippet.user:
                return JsonResponse([{'you don''t have permission to update'}], status=200)
            serializer = PostModelSerializer(snippet, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)

        elif request.method == 'DELETE':
            snippet.delete()
            return HttpResponse(status=204)


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def commentquestion(request, pk):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = CommentQuestion.objects.filter(postquestion_id=pk)
        serializer = CommentDetailSerializer(snippets,many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer = CommentQuestionModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['postquestion_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def commentupdate(request, pk,cid):
        """
        Retrieve, update or delete a code snippet.
        """
        try:
            snippet = CommentQuestion.objects.get(pk=cid,postquestion_id=pk)
        except CommentQuestion.DoesNotExist:
            return HttpResponse(status=404)

        if request.method == 'GET':
            serializer = CommentQuestionModelSerializer(snippet)
            return JsonResponse(serializer.data)

        elif request.method == 'PUT':
            if not request.user == snippet.user:
                return JsonResponse({'you don''t have permission to update'}, status=200)
            serializer = CommentQuestionModelSerializer(snippet, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)

        elif request.method == 'DELETE':
            snippet.delete()
            return HttpResponse(status=204)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def answerupdate(request, pk, cid):
        """
        Retrieve, update or delete a code snippet.
        """
        try:
            snippet = AnswerQuestion.objects.get(pk=cid, postquestion_id=pk)
        except AnswerQuestion.DoesNotExist:
            return HttpResponse(status=404)

        if request.method == 'GET':
            serializer = AnswerQuestionModelSerializer(snippet)
            return JsonResponse(serializer.data)

        elif request.method == 'PUT':
            if not request.user == snippet.user:
                return JsonResponse({'you don''t have permission to update'}, status=200)
            serializer = AnswerQuestionModelSerializer(snippet, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)

        elif request.method == 'DELETE':
            snippet.delete()
            return HttpResponse(status=204)