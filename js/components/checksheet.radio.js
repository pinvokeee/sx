const checkSheetRadioButton =
{
    props:
    {
        target:
        {
            type: Object
        },
    },

    data()
    {
        return {
            _selectedItems: [],
        }
    },

    computed:
    {

        selectedItems:
        {
            get()
            {
                return this._selectedItems;
            },

            set(value)
            {
                this._selectedItems = value;
            }
        }

    },

    template: `
        <div>
            {{target.title}}
        </div>
        <div v-for="item in target.items" :key="item.title">
            <label>
                <input type="radio" :value="item.title" v-model="selectedItems">
                {{item.title}}
            </label>
        </div>
    `
}