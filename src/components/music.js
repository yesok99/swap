var template = `<div>
    <div style="padding:15px" class = "music">
        <audio ref="myAudio" src="./test/your-music-file.mp3"></audio>
        <button  @click="playAudio">播放</button>
        <button  @click="pauseAudio">暂停</button>
        <button  @click="stopAudio">停止</button>
    </div>
    <div> 
      <input type="text" v-model="unstakeNumber"  placeholder="0 ~ n" /> <button  @click="unstake">web 赎回</button>
    </div>
</div>`

import { EventBus } from './event-bus.js';
export default {
    template,
    mounted() {

        // this.$refs.myAudio.loop = true;
        this.$refs.myAudio.currentTime = 43; // 设置从第43秒开始播放
        this.$refs.myAudio.addEventListener('timeupdate', () => {
          if (this.$refs.myAudio.currentTime >= 178) {
            this.$refs.myAudio.currentTime = 43; // 当播放到第178秒时，重置为第43秒重新开始播放
          }
        });

        //音乐加载完成
        // isMusicLoad = true;
      },
      data(){
        return {
          unstakeNumber:0
        }
      },
    methods: {
        playAudio() {
          this.$refs.myAudio.play();
        },
        pauseAudio() {
            this.$refs.myAudio.pause();
        },
        stopAudio(){
            this.$refs.myAudio.pause();
            this.$refs.myAudio.currentTime = 0;
        },

        unstake(){
          
          unstake(0,this.unstakeNumber);
          
        }

      },

      //使用bus总线接收信息
    created() {
        EventBus.$on('playAudio', (data)=>{
            this.$refs.myAudio.currentTime = 43;
            this.$refs.myAudio.play();
        
        });
        EventBus.$on('pauseAudio', (data)=>{

            this.$refs.myAudio.pause();
        
        });
      },
 
      beforeDestroy() {
        EventBus.$off('playAudio', this.playAudio);
        EventBus.$off('playAudio', this.pauseAudio);

      },

}