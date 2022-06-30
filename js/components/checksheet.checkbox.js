const checkSheetCheckBox =
{
    props:
    {
        target:
        {
            type: Object
        },
    },

    template: `
        <div>
            {{target.title}}
        </div>
        <div v-for="item in target.items" :key="item.title">
            <label>
                <input type="checkbox" :value="item.title">
                {{item.title}}
            </label>
            
        </div>
    `
}