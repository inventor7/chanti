<template>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="alert-modal" class="modal-toggle" />
    <div class="modal bg-black/30 modal-bottom sm:modal-middle">
        <div class="modal-box">
            <!-- <h3 class="font-bold text-lg">Congratulations random Internet user!</h3> -->
            <p class="py-4 font-semibold text-lg ">{{ message }}</p>
            <div class="modal-action">
                <label for="alert-modal" class="btn btn-ghost " :class="{

                }">
                    Discard
                </label>
                <label @click="handleCloseBtn" for="alert-modal" class="btn text-white " :class="{
                    'btn-primary': closeBtnColor === 'primary',
                    'btn-secondary': closeBtnColor === 'secondary',
                    'btn-success': closeBtnColor === 'success',
                    'btn-error': closeBtnColor === 'error',
                }">
                    {{ closeBtnText }}
                </label>

            </div>
        </div>
    </div>
</template>

<script >
export default {
    name: 'Modal',
    props: {
        //the message to display in the modal
        message: {
            type: String,
            default: ''
        },
        //the text of the close button
        closeBtnText: {
            type: String,
            default: 'Close'
        },
        //the color of the close button
        closeBtnColor: {
            type: String,
            default: 'primary'
        },
        toggleBtnText: {
            type: String,
            default: 'Delete'
        }
    },
    emits: ['handleCloseBtn'],
    //reciveing a function from the parent component to the child component exactly in the ok button
    setup(props, context) {
        const handleCloseBtn = () => {
            context.emit('handleCloseBtn');
        }
        return {
            handleCloseBtn
        }
    }
}

</script>
