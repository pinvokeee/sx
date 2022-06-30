const checkSheet =
{
    components:
    {
        "checksheetblock": checkSheetBlock
    },

    data()
    {
        return {
            button_enabled: false,
            _output: [],

            items:
            [
                {
                    title: "番号",
                    type: "text",
                    isRequired: true,
                    validateRegExp: "^\\d{6}[-]\\d+$",
                    validateErrorMessage: "正しい形式で入力してください"
                },

                {
                    id: 0,
                    title: "チェックボックステスト",
                    type: "radio",
                    isRequired: true,
                    items:
                    [
                        { title: "あいうえお" },
                        { 
                            title: "かきくけこ",                            
                            child:
                            [
                                {
                                    title: "AAAABBB",
                                    type: "check",
                                    items:
                                    [
                                        {
                                            title: "TEST",
                                        }
                                    ]
                                }
                            ]
                        },
                        { title: "さしすせそ" },
                    ],
                },
            ],
            
            valueSet:
            [

            ]
        }
    },

    mounted()
    {
        this.id_auto_mapping(this.items, 0);
        this.create_valueSet(this.items, this.valueSet);

        console.log(this.items, this.valueSet);
    },

    methods:
    {
        id_auto_mapping(arr, current_id)
        {
            if (arr == null) return current_id;

            for (obj of arr)
            {
                obj.id = current_id++;
                current_id = this.id_auto_mapping(obj.child, current_id);

                if (obj.items != null) 
                {
                    for (item of obj.items)
                    {
                        current_id = this.id_auto_mapping(item.child, current_id);
                    }
                }
            }

            return current_id;
        },

        create_valueSet(arr, currentChild)
        {
            if (arr == null) return;

            for (obj of arr)
            {
                console.log(obj, currentChild);

                currentChild["X" + obj.id] = 
                {
                    title: obj.title,
                    value: "",               
                    children: [],     
                }

                this.create_valueSet(obj.child, currentChild.children);

                if (obj.items != null) 
                {
                    for (item of obj.items)
                    {
                        this.create_valueSet(item.child, currentChild.children);
                    }
                }
            }
        },

        onStateChange(obj)
        {
            const out_value = obj.target.type == "check" ? obj.value.join(",") : obj.value;
            this._output[obj.target.id] = `${obj.target.title}:${out_value}`

            console.log(this._output);
        },

        onCompleted(target, value)
        {
            console.log(target, value);
            this.button_enabled = value;
        },

        output()
        {
            console.log(this.items);
        }
    },

    template:`
        <div v-for="item in items" :key="item.id">
            <checksheetblock :target="item" :enabled="true" v-bind="{onStateChange, onCompleted}"></checksheetblock>
        </div>

        <input type="button" v-bind:disabled="!button_enabled" class="" @click="output">
    `
}