const checkSheetBlock = 
{
    name: "checkSheetBlock",

    props:
    {
        target:
        {
            type: Object
        },

        enabled:
        {
            type: Boolean
        },

        onStateChange:
        {
            type: Function
        },

        onCompleted:
        {
            type: Function
        }
    },

    data()
    {
        return {
            _text: "",
            _selectedItems: [],
            _checked: false,
            _change: false,
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
                this.changed = true;
                this._selectedItems = value;

                if (this.onStateChange != null) this.onStateChange(
                    {
                        target: this.target,
                        value: value,
                        isErrorValidate: this.isRequiredError(),
                        isErrorRequired: this.isValidateError(),
                    }
                );

                if (this.onCompleted != null) this.onCompleted(this.target, this.isRequiredError() && this.isValidateError());
            }
        },

        text:
        {
            get()
            {
                return this._text;
            },

            set(value)
            {
                this.changed = true;
                this._text = value;

                if (this.onStateChange != null) this.onStateChange(
                    {
                        target: this.target,
                        value: value,
                        isErrorValidate: this.isRequiredError(),
                        isErrorRequired: this.isValidateError(),
                    }
                );

                if (this.onCompleted != null) this.onCompleted(this.target, this.isRequiredError() && this.isValidateError());
            }
        },

        changed:
        {
            get()
            {
                return this._change;
            },

            set(value)
            {
                this._change = value;
            }
        }
    },

    methods:
    {
        isEnabledForCheckBox(title)
        {
            return this.selectedItems.includes(title);
        },

        isEnabledForRadioButton(title)
        {
            return this.selectedItems == title;
        },

        isError()
        {
            return !this.isRequiredError() || !this.isValidateError();
        },

        getErrorMessage()
        {
            if (this.isRequiredError())
            {
                if (this.target.type == "text") return "入力は必須です";
                if (this.target.type == "check" || this.target.type == "radio") return "選択は必須です";
            }

            if (this.isValidateError())
            {
                return this.target.validateErrorMessage;
            }
        },

        isRequiredError()
        {
            if (!this.enabled) return false;
            
            if (this.target.isRequired == null || !this.target.isRequired) return false;

            if (this.target.type == "text") return this.text.length == 0;
            if (this.target.type == "check") return this.selectedItems.length == 0;
            if (this.target.type == "radio") return this.selectedItems == "";

            return false;
        },

        isValidateError()
        {
            if (!this.enabled) return false;

            if (this.text.length == 0) return false;

            if (this.target.validateRegExp != null && this.target.validateRegExp.length > 0)
            {
                return !(new RegExp(this.target.validateRegExp, "g").test(this.text));
            }
        }
    },

    mounted()
    {
        // console.log(this.target);
    },

    template: `
        <div class="block">
            <div class="" v-if="target.hiddenTitle==null || !target.hiddenTitle">
                <span>{{target.title}}</span>
                <span v-if="target.isRequired" class="requiredBadge">必須</span>
                <div class="validate_error" v-show="changed && isError()">{{getErrorMessage()}}</div>
            </div>

            <div class="">
                <template v-if="target.type=='text'">
                    <!-- テキスト入力欄 -->
                    <input class="inline-item" type="text" v-model="text" v-bind:disabled="!enabled">

                </template>

                <template v-if="target.type=='check'">
                    <!-- チェックボックス -->
                    <div class="inline-item" v-for="item in target.items" :key="item.title">
                        <label class="">
                            <input class="" type="checkbox" :value="item.title" v-model="selectedItems" v-bind:disabled="!enabled">
                            {{item.title}}
                        </label>

                        <div class="child" v-for="ch in item.child" :key="ch.id" style="margin-left: 30px">
                            <checkSheetBlock v-bind:target="ch" :enabled="isEnabledForCheckBox(item.title)" v-bind="{onStateChange,onCompleted}">
                            </checkSheetBlock>
                        </div>
                    </div>
                </template>

                <template v-if="target.type=='radio'">
                    <!-- ラジオボタン -->
                    <div class="inline-item" v-for="item in target.items" :key="item.title">                          
                        <label class="">
                            <input class="" type="radio" :value="item.title" v-model="selectedItems" v-bind:disabled="!enabled">
                            {{item.title}}
                        </label>

                        <div class="child" v-for="ch in item.child" :key="ch.id">                    
                            <checkSheetBlock v-bind:target="ch" :enabled="isEnabledForRadioButton(item.title)" v-bind="{onStateChange,onCompleted}">
                            </checkSheetBlock>
                        </div>
                    </div>
                </template>

                <!-- 入れ子要素 -->
                <div class="child" v-if="target.child != null" v-for="item in target.child" :key="item.id" v-bind="{onStateChange,onCompleted}">
                    <checkSheetBlock v-bind:target="item" :enabled="true">                
                    </checkSheetBlock>
                </div>
            </div>
        </div>
    `
}