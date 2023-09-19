interface User {
  username: string;
  userId: string;
  comment: string;
}

class Game {
  chat(user: User) {
    console.log(`${user.username} (userId:${user.userId}) writes: ${user.comment}`);
  }
}

export default new Game();
