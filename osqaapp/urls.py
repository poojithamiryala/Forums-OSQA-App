from django.conf.urls import url
from django.urls import path, include

from osqaapp import views

urlpatterns = [
    url(r'questions/$', views.snippet_list),
    path('questions/<int:pk>/views/', views.viewsonquestion),
    path('questions/<int:pk>/tags/', views.tags),
    path('questions/<int:pk>/votes/', views.votesonquestion),
    path('questions/<int:pk>/answer/', views.answerquestion),
    path('questions/<int:pk>/comment/', views.commentquestion),
    path('questions/<int:pk>/', views.questionupdate),
    path('questions/<int:pk>/comment/update/<int:cid>/',views.commentupdate),
    path('questions/<int:pk>/answer/update/<int:cid>/',views.answerupdate),
    path('questions/<str:type>/',views.questionssort),
    path('tags/',views.tag_list),
    path('tags/<str:t_name>/',views.tag_detail),
    path('tags/<str:t_name>/<str:type>/',views.tagssort),
    path('questions/<int:pk1>/votes/<int:pk>/', views.votesonanswer),
    path('questions/search/<str:search>/', views.search_list),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
]