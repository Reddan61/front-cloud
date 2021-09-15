<template>
  <div class="button">
    <button  class="button__item"> <slot></slot> </button>  
  </div>
</template>

<script>
export default {
    name:"custom-button",
    props: {
      
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
        }
    }
</style>