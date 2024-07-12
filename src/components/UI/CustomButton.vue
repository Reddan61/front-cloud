<template>
  <div class="button">
    <button class="button__item" :class="{
      button__item_disabled: disabled
    }"> <slot></slot> </button>  
  </div>
</template>

<script>
export default {
    name:"custom-button",
    props: {
      disabled: {
        default: false,
        type: Boolean
      }
    }
}
</script>

<style scoped lang = "scss">
    .button {
        &__item {
            color:white;
            background: royalblue;
            padding: .5em 1em;
            border-radius: 5px;

            &_disabled {
              background: gray;
            }
        }
    }
</style>