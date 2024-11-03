import { createRouter, createWebHistory } from 'vue-router';
import TitleScreen from '../components/TitleScreen.vue';  // TitleScreenをインポート
import MultiplayerGame from '../components/MultiplayerGame.vue';
import WaitingForMatch from '../components/WaitingForMatch.vue';
import WaitingRoom from '../components/WaitingRoom.vue';
import SinglePlayerGame from '../components/SinglePlayerGame';

const routes = [
  { path: '/', component: TitleScreen },  // タイトル画面に対応
  { path: '/multiplayer', component: MultiplayerGame },  // 対戦画面
  { path: '/waiting-for-match', component: WaitingForMatch },  // 対戦待機画面
  { path: '/waiting', component: WaitingRoom },   // 待機室
  { path: '/single', component: SinglePlayerGame} //1人用モード
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
