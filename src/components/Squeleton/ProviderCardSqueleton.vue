<template>
    <div class=" w-fit h-fit provider-card-squeleton">
        <div class="provider-card-squeleton__header">
            <div class="provider-card-squeleton__header__avatar"></div>
            <div class="provider-card-squeleton__header__name"></div>
        </div>
        <div class="provider-card-squelet on__body">
        </div>
    </div>
</template>

<script>

</script>

<style>
.provider-card-squeleton {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
}

.provider-card-squeleton__header {
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    box-sizing: border-box;
}

.provider-card-squeleton__header__avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #ccc;
}

.provider-card-squeleton__header__name {
    width: 10rem;
    height: 1rem;
    background-color: #ccc;
}

.provider-card-squeleton__body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.provider-card-squeleton__body__item {
    width: 100%;
    height: 1rem;
    margin: 0.5rem 0;
    background-color: #ccc;
}

.provider-card-squeleton__body__item:last-child {
    width: 50%;
}

</style>