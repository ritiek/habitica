'use strict';

angular.module('habitrpg').factory('Chat',
['$resource', '$q', '$http', 'ApiUrl', 'User',
function($resource, $q, $http, ApiUrl, User) {
  var utils = $resource(ApiUrl.get() + '/api/v2/groups/:gid',
    {gid:'@_id', messageId: '@_messageId'},
    {
      postChat: {method: "POST", url: ApiUrl.get() + '/api/v2/groups/:gid/chat'},
      like: {method: 'POST', isArray: true, url: ApiUrl.get() + '/api/v2/groups/:gid/chat/:messageId/like'},
      deleteChatMessage: {method: "DELETE", url: ApiUrl.get() + '/api/v2/groups/:gid/chat/:messageId'},
      flagChatMessage: {method: "POST", url: ApiUrl.get() + '/api/v2/groups/:gid/chat/:messageId/flag'},
      clearFlagCount: {method: "POST", url: ApiUrl.get() + '/api/v2/groups/:gid/chat/:messageId/clearflags'},
    });

  var chatService = {
    seenMessage: seenMessage,
    utils: utils
  };

  return chatService;

  function seenMessage(gid) {
    // On enter, set chat message to "seen"
    $http.post(ApiUrl.get() + '/api/v2/groups/'+gid+'/chat/seen');
    if (User.user.newMessages) delete User.user.newMessages[gid];
  }
}])
