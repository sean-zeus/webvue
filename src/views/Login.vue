<template>
    <div class="loging">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css"
        integrity="sha512-vZWT27aGmde93huNyIV/K7YsydxaafHLynlJa/4aPy28/R1a/IxewUH4MWo7As5I33hpQ7JS24kwqy/ciIFgvg=="
        crossorigin="anonymous" />

      <img class="waveL" src="@/assets/img/wave.png" />
      <div class="containerL">
        <div class="imgL">
          <img :src="require('@/assets/img/bg.svg')" />
        </div>

        <div class="login-contentL">
          <form>
            <img src="@/assets/img/avatar.svg" />
            <h2 class="login_titleL" >歡迎使用本系統</h2>
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>登入帳號</h5>
                <input type="text" class="inputL" required autofocus v-model="form.userName" id="text1" @keyup.enter.prevent="keyTab($event)" autocomplete="off"/>
              </div>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>登入密碼</h5>
                <input :type="togglePassword" class="inputL" required v-model="form.password" id="text2" @keyup.enter="submitLogin"/>
              </div>
            </div>
            <a href="#" @click="togglePassword = (togglePassword==='password' ? 'text' : 'password')">顯示密碼</a>
            <input class="ibtnL" value="登入系統" @click="submitLogin" />
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      togglePassword: 'password',
      form: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    submitLogin () {
      // this.$Spin.show()
      this.$store.dispatch('handleLogin', { userName: this.form.userName, password: this.form.password })
        .then(res => {
          if (res === '登入完成') {
            this.$store.dispatch('getUserInfo').then(data => {
              this.$router.push({
                name: this.$gconf.homeName
              })
            })
          }
          // setTimeout(() => this.$Spin.hide(), 1000)
        })
        .catch(error => {
          // setTimeout(() => this.$Spin.hide(), 1000)
          console.log(error.response == null ? error : error.response.data)
        })
    },
    keyTab (event) {
      let _txt2 = document.getElementById('text2')
      _txt2.focus()
      _txt2.select()
    }
  },
  mounted () {
    const inputs = document.querySelectorAll('.inputL')

    function addcFocus () {
      const parent = this.parentNode.parentNode
      parent.classList.add('focus')
    }

    function remcFocus () {
      const parent = this.parentNode.parentNode
      if (this.value === '') {
        parent.classList.remove('focus')
      }
    }

    inputs.forEach(input => {
      input.addEventListener('focus', addcFocus)
      input.addEventListener('blur', remcFocus)
    })
  }
}
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'); */

/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} */

/* body {
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
} */

.waveL {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: 0;
}

.containerL {
  width: 100vw;
  height: 88vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15rem;
  padding: 0rem 3rem;
}

.imgL {
  display: flex;
  justify-content:flex-end;
  align-items: center;
  z-index: 0;
}

form {
  width: 400px;
}

.login-contentL {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.imgL img {
    width: 600px;
}

.login-contentL img {
  height: 100px;
}

.login-contentL .login_titleL {
  margin: 15px 0;
  color: #333;
  text-transform: uppercase;
  font-size: 1.4rem;
}

.login-contentL .input-div {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.login-contentL .input-div .one {
  margin-top: 0;
}

.i {
  color: #555;
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i {
  transition: 0.3s;
}

.input-div > div {
  position: relative;
  height: 45px;
}

.input-div > div > h5 {
  color: #555;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  transition: 0.3s;
}

.input-div:before,
.input-div:after {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: 0.4s;
}

.input-div:before {
  right: 50%;
}

.input-div:after {
  left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
  width: 50%;
}

.input-div.focus > div > h5 {
  top: -5px;
  font-size: 15px;
}

.input-div.focus > .i > i {
  color: #38d39f;
}

.input-div > div > input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
}

.input-div .pass {
  margin-bottom: 4px;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}
a:hover {
  color: #38d39f;
}
.ibtnL {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  background-size: 200%;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}

.ibtnL:hover {
  background-position: right;
}

/* --------------Responsive----------------- */
@media screen and (max-width: 1600px) {
  .containerL {
    grid-gap: 10rem;
  }
}

@media screen and (max-width: 1350px) {
  .containerL {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1200px) {
  .containerL {
    grid-gap: 8rem;
  }
  .waveL {
    display: none;
  }
  form {
    width: 300px;
  }
  .login-contentL .login_titleL {
    font-size: 2.4rem;
    margin: 8px 0;
  }
  .imgL img {
    width: 500px;
  }
}

@media screen and (max-width: 1000px) {
  .containerL {
    grid-template-columns: 1fr;
  }

  .imgL {
    display: none;
  }
  .waveL {
    display: none;
  }
  .login-contentL {
    justify-content: center;
  }
}
</style>>
