<template>
<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
						<span style="font-weight:bold">CNCF CI DASHBOARD</span>  <span style="color:rgb(126, 126, 126);font-weight:bold">beta</span>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <p>This is <span style="color:rgb(126, 126, 126)">beta</span> software. Would you like to take a look?</p>
              <p style="font-size:10px;font-style:italic">The accuracy of the data is not guaranteed</p>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              &nbsp;
              <button class="modal-default-button modal-default-button-yes" @click="$emit('close')">
                Yes
              </button>
              &nbsp;
              <button class="modal-default-button modal-default-button-no" @click="gotoURL()">
                No
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'beta-modal',
  props: ['url'],
  data: function () {
    return {
      showModal: true
    }
  },
  methods: {
    gotoURL () {
      window.location.href = 'https://www.cncf.io'
    }
  }
}
</script>

<style lang="css">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .75);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: 'Encode Sans', sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #000;
  font-family: 'Encode Sans', sans-serif;
}

.modal-body {
  margin: 20px 0;
  font-size: 15px;
}

.modal-footer {
 flex-direction: row-reverse;
 display: flex;
}

.modal-default-button {
  float: right;
}

.modal-default-button-yes {
 border: 1px solid #ccc;
 font-size: 14px;
 padding: .5rem 1rem;
 border-radius: 5px;
 cursor: pointer;
 color: #fff;
 transition: box-shadow 400ms ease;
 
 &:hover {
   box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
 }  
  float: right;
  background-color: rgb(38, 121, 170);
}

.modal-default-button-no {
 font-size: 14px;
 border: 1px solid #ddd;
 padding: .5rem 1rem;
 border-radius: 5px;
 cursor: pointer;
 color: #000;
 transition: box-shadow 400ms ease;
 
 &:hover {
   box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
 } 
  float: right;
  background-color: #fff;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (max-width: 567px) {
  .modal-body {
    margin: 20px 0;
    font-size: 14px;
  }

  .modal-container {
    width: 325px;
    margin: 0px auto;
    padding: 20px 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: 'Encode Sans', sans-serif;
  }
}
</style>
