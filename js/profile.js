function PlayerProfile(id, name, image) {
  this.id = id;
  this.name = name;
  this.image = image;

  this.getName = function() {
    return this.name;
  }
  
  this.getImage = function() {
    return this.image;
  }
}

PlayerProfile.list = [];

PlayerProfile.add = function(name, image) {
  var id = PlayerProfile.list.length;
  var playerProfile = new PlayerProfile(id, name, image);
  PlayerProfile.list.push(playerProfile);
}

PlayerProfile.get = function(id) {
  return PlayerProfile.list[id];
}

PlayerProfile.size = function() {
  return PlayerProfile.list.length;
}

//
PlayerProfile.add('llach', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/c145.62.621.621/s160x160/223934_4515148685952_1467128954_n.jpg');
PlayerProfile.add('mrogacki', 'https://0.gravatar.com/avatar/6fa769ffe7acdb387bab63ab6b3d7c9e?d=https%3A%2F%2Fidenticons.github.com%2F57bfd79a6fb93180aaca1a72d4299725.png&r=x&s=160');
PlayerProfile.add('jonathan', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c25.25.318.318/s160x160/307428_284162121602773_1759132373_n.jpg');
PlayerProfile.add('madamiak', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c0.2.180.180/s160x160/68275_542727212455778_85923179_a.jpg');
PlayerProfile.add('dpiotrowski', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c91.26.329.329/s160x160/46281_108029742593977_4255327_n.jpg');
PlayerProfile.add('gpawlik', 'https://0.gravatar.com/avatar/eab8557a9cb59427455bac3cc59d2802?d=https%3A%2F%2Fidenticons.github.com%2Fe636ab286cc9499d66146e66986f0c88.png&r=x&s=160');
PlayerProfile.add('mtasak', 'https://0.gravatar.com/avatar/49abf1ec428936df921a63eb2fcdc648?d=https%3A%2F%2Fidenticons.github.com%2Fd01df94f441f35c64f0ce7f69dd37618.png&r=x&s=160');
PlayerProfile.add('kgorecki', 'https://0.gravatar.com/avatar/3adce4cbc7ab549bdbb06e9016e95941?d=https%3A%2F%2Fidenticons.github.com%2F322219a2830632b395dcd23b63f03a36.png&r=x&s=160');
PlayerProfile.add('damian', 'https://1.gravatar.com/avatar/c57fb182eaeecee2909542ae32c7d062?d=https%3A%2F%2Fidenticons.github.com%2Fc82cefd94c2938a7da1491fb099101f4.png&r=x&s=160');
PlayerProfile.add('mmaron', 'https://2.gravatar.com/avatar/5de6f3234b1617d619f68100ac5347e1?d=https%3A%2F%2Fidenticons.github.com%2Fbc78b8832386606d40259512edb71d37.png&r=x&s=160');
//PlayerProfile.add('lkrupinski', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/t1.0-1/c62.62.776.776/s160x160/409255_2126545743019_295066914_n.jpg');
//PlayerProfile.add('mgil', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/t1.0-1/c113.33.414.414/s160x160/539224_4381068606233_195886734_n.jpg');
PlayerProfile.add('cgautier', 'https://lh6.googleusercontent.com/-zQ6wawls8eE/AAAAAAAAAAI/AAAAAAAAACs/NOsy0rMcUek/s120-c/photo.jpg');
