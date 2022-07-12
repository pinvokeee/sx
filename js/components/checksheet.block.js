const checkSheetBlock = 
{
    name: "checkSheetBlock",

    props:
    {
        target:
        {
            type: checkItem
        },

        isEditable:
        {
            type: Boolean
        },

        enabled:
        {
            type: Boolean
        },

        onStateChange:
        {
            type: Function
        },

        onSelectedComponent:
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
            _changed: false,
            _isEnabled: this.enabled,
        }
    },

    updated()
    {
        this.isEnabled = this.enabled;
    },

    computed:
    {
        value:
        {
            get()
            {
                if (this.target.type == "check") return this.selectedItems;
                if (this.target.type == "radio") return this.selectedItems;
                if (this.target.type == "text") return this.text;

                return this.target.label;
            }
        },

        isEnabled:
        {
            get()
            {
                //状態に変更があった場合は通知する
                if (this._isEnabled != this.target.state.isEnabled)
                {
                    this.onStateChange(this.target, 
                    {
                        isEnabled: this._isEnabled,
                        isChanged: this.isChanged,
                        value: this.value,
                    });
                }

                return this._isEnabled;
            },
            set(value)
            {
                this._isEnabled = value;
            }
        },

        isChanged:
        {
            get()
            {
                return this._changed;
            },

            set(value)
            {
                this._changed = value;
            }
        },

        selectedItems:
        {
            get()
            {
                return this._selectedItems;
            },

            set(value)
            {
                this.isChanged = true;
                this._selectedItems = value;

                this.onStateChange(this.target, 
                {
                    isEnabled: this.enabled,
                    isChanged: this.isChanged,
                    value: this.value,
                });
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
                this.isChanged = true;
                this._text = value;

                this.onStateChange(this.target, 
                {
                    isEnabled: this.enabled,
                    isChanged: this.isChanged,
                    value: this.value,
                });
            }
        },
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
        
        getInnerBlocksClass(enabled)
        {
            const cls = ["block"];

            if (this.isEditable) cls.push("editSelecter");
            if (!this.isEnabled) cls.push("disabled");

            return cls;
        },
    },

    mounted()
    {
        // console.log(this.target);
    },

    template: `
        <div :class="getInnerBlocksClass()" @click="onSelectedComponent($event, target)">
            <div class="" v-if="target.hiddenTitle==null || !target.hiddenTitle">
                <h6>{{target.label}}<span v-if="target.isRequired && isEnabled" class="badge text-bg-danger">必須</span></h6>
                <div class="validate_error" v-show="isEnabled && isChanged && target.getErrorMessage() != null">{{target.getErrorMessage()}}</div>
            </div>
<!-- 
            <button class="btn btn-primary">
                <div class="bi bi-plus-circle"><span>追加</span></div>                
            </button> -->

            <div class="">
                <template v-if="target.type=='text'">
                    <!-- テキスト入力欄 -->
                    <div class="">
                        <input class="inline-item" type="text" v-model="text" v-bind:disabled="!isEnabled">
                    </div>
                </template>

                <template v-if="target.type=='check'">
                    <!-- チェックボックス -->
                    <div class="">
                        <div class="inline-item" v-for="item in target.items" :key="item.label">
                            <label class="">
                                <input class="form-check-input" type="checkbox" :value="item.label" v-model="selectedItems" v-bind:disabled="!isEnabled">
                                {{item.label}}
                            </label>
                    
                            <div class="child" v-for="ch in item.items" :key="ch.id" style="margin-left: 30px">
                                <checkSheetBlock :isEditable="isEditable" v-bind:target="ch" :enabled="isEnabled && isEnabledForCheckBox(item.label)" v-bind="{onStateChange, onSelectedComponent}">
                                </checkSheetBlock>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="target.type=='radio'">
                    <!-- ラジオボタン -->
                    <div class="inline-item" v-for="item in target.items" :key="item.label">                          
                        <label class="">
                            <input class="form-check-input" type="radio" :value="item.label" v-model="selectedItems" v-bind:disabled="!isEnabled">
                            {{item.label}}
                        </label>

                        <div class="child" v-for="ch in item.items" :key="ch.id">                    
                            <checkSheetBlock :isEditable="isEditable" v-bind:target="ch" :enabled="isEnabled && isEnabledForRadioButton(item.label)" v-bind="{onStateChange,onSelectedComponent}">
                            </checkSheetBlock>
                        </div>
                    </div>
                </template>

                <template v-if="target.type=='table'">
                    
                </template>

            </div>
        </div>
    `
}