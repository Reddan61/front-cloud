<template>
    <div class="input">
        <div class="input__wrapped">
            <input class="input__item" :class="{
                input__item_hide: !reposPlaceholder
            }" :value = "modelValue" @input = "updateInput"/>
            <span class="input__placeholder"> {{ label }} </span>
        </div>
        <div class="input__line"></div>
    </div>
</template>

<script>
export default {
    name:"custom-input",
    props: {
        modelValue: [String,Number],
        label: {
            type:String,
            required:true
        }
    },
    data() {
        return {
            reposPlaceholder:true
        }
    },
    methods: {
        updateInput(e) {
            if(e.target.value !== "") {
                this.reposPlaceholder = false
            } else {
                this.reposPlaceholder = true
            }
            this.$emit("update:modelValue",e.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>
    .input {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: .825em 0 0;
        &__wrapped {
            margin: 0 0 0 5px;
            position: relative;
        }
        &__item {
            padding: .2em 0;
            font-size: 1em;
            &:focus,&_hide {
                + span {
                    top:-.825em;
                    font-size: .825em;
                    transform: translateY(0);
                }
            }
        }
        &__placeholder {
            transition: all .2s linear 0s;
            pointer-events: none;
            position: absolute;
            top: 50%;
            font-size: 1em;
            left: 0;
            transform: translateY(-50%);
        }
        &__line {
            width: 100%;
            height: 1px;
            background: black;
        }
    }
</style>