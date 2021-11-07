export const environment = {
  API_LOCAL: 'http://localhost:8080/',
  API_SERVER: 'https://phong-thanh-test2.herokuapp.com/', //tại sao phải khai báo biến ở chỗ khác, bởi vì khi thay đổi thì chỉ thay đổi 1 biến này là được thay vì phải thay đổi ở nhiều nơi khác nhau.
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyBOxk8Jx4y6CqYFo8YpyPTPbDDDn9cp71c',
    authDomain: 'c1220g1.firebaseapp.com',
    projectId: 'c1220g1',
    storageBucket: 'c1220g1.appspot.com',
    messagingSenderId: '633220778049',
    appId: '1:633220778049:web:e7cde891f56c5927eb5ec0',
    measurementId: 'G-25TE4NSP4T'
  }
};
