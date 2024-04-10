<template>
    <v-container>
        <v-row justify="center">
            <v-col v-if="input" cols="12">
                <v-text-field v-model="numberInput" @keydown="validateInput" single-line rounded class="rounded-pill" density="compact" variant="outlined" type="tel" @keyup.enter="make_call"></v-text-field>
            </v-col>
                    
            <v-col  v-for="(item, index) in items" :key="index"  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill"
                    @click="appendToNumber(item.value)">
                    <div class="adion-btn a-10" >
                        <span class="adion-number">{{ item.value }}</span>
                        <span class="adion-letter">{{ item.text }}</span>
                    </div>
                </v-btn>
            </v-col>

            <v-col v-if="back" cols="12" class="adion-back">
                <v-btn outlined @click="close" rounded size="small"  width="80px" class="rounded-pill mt-5" icon="mdi-undo">
                </v-btn>
            </v-col>          
            <v-col v-else cols="12" class="adion-call">
                <v-btn outlined @click="make_call" rounded size="small"  width="80px" class="rounded-pill mt-5" icon="mdi-phone">
                </v-btn>
            </v-col>                
        </v-row>
    </v-container>
</template>

<script setup>
    import { ref, defineEmits } from 'vue'
    import useAdion from '@/Adion'

    const adion = useAdion()

    const props = defineProps({
        call: Object,
        input: Boolean,
        back: Boolean,
    });

    const numberInput = ref('')
    const items = [
        { value: '1', text: 'mess.' },
        { value: '2', text: 'abc' },
        { value: '3', text: 'def' },
        { value: '4', text: 'ghi' },
        { value: '5', text: 'jkl' },
        { value: '6', text: 'mno' },
        { value: '7', text: 'pqrs' },
        { value: '8', text: 'tuv' },
        { value: '9', text: 'wxyz' },
        { value: '*', text: '' },
        { value: '0', text: '+' },
        { value: '#', text: '' },
    ]

    function isValidCharacter(char) {
        const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '*', '+'];
        return validChars.includes(char);
    }

    function validateInput(event) {
        if (!isValidCharacter(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
            event.preventDefault();
        }
    }

    function appendToNumber(value) {
        numberInput.value += value;
        if(props.back === true){
            adion.call.dtmf(props.call.id, value)
        }
    }

    const emit = defineEmits([
        'close',
    ]);

    function close(){
        emit('close')
    }

    function make_call(){
        if(numberInput.value.length > 0 && props.back === false){
            adion.call.new(numberInput.value)
        }
    }
</script>

<style scoped>
.v-col{
    text-align: center;
}
.adion-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.adion-number {
    font-size: 1.3rem;
}

.adion-letter {
    font-size: 0.6rem;
}

.adion-back {
    text-align: center;
}

.adion-back button{
    color: white;
    background-color: #2B4461;
}
.adion-call button{
    color: white;
    background-color: #449D78;
}

</style>
