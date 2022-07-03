const checkSheetEditor =
{
    props:
    {
        selectedCheckItem:
        {
            type: Object
        }
    },

    methods:
    {
        onInput(e)
        {
            console.log(e);
            this.selectedCheckItem.label = e.target.value;
        }

    },

    template: `
        
        <div v-if="selectedCheckItem != null">
            <div>
                <h6>ラベル</h6>
                <input :value="selectedCheckItem.label" @input="onInput">
            </div>

            <div>
                <label>
                    <input type="checkbox">
                    <span>必須項目</span>
                </label>

            </div>
        </div>


    `
}