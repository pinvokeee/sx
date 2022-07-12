const checkSheetEditor =
{
    props:
    {
        sheet:
        {
            type: sheetManager
        },

        selectedCheckItem:
        {
            type: Object
        },

        onApplyItemProperty:
        {
            type: Function
        },

        onRemoveItem:
        {
            type: Function
        }
    },

    watch:
    {
        //選択したアイテムが変わったら編集用アイテムにコピーする
        selectedCheckItem: function(newValue, oldValue)
        {
            this.editableItem = newValue.clone();
        }
    },

    data()
    {
        return {
            editableItem: null,
            property: []
        }
    },

    methods:
    {
        onApply(event)
        {
            for (const key of Object.keys(this.editableItem))
            {
                if (!(this.selectedCheckItem[key] instanceof Object))
                {
                    this.selectedCheckItem[key] = this.editableItem[key];
                }
            }

            this.selectedCheckItem.setValidation(
                {
                    pattern: item.validation.pattern,
                    errorMessage: item.validation.errorMessage
                }
            );

            this.editableItem.items.length = 0;
            item.items.forEach(a => this.editableItem.items.push(a.clone()));
            
            delete this.editableItem;

            // this.onApplyItemProperty(event, this.editableItem);
            // delete this.editableItem;
        },

        onRemove(event)
        {
            this.onRemoveItem(event, this.editableItem);
            delete this.editableItem;
        }
    },

    template: `
        
        <div class="d-grid gap-2" v-if="editableItem != null">
            <div>
                <h6>ラベル</h6>
                <input v-model="editableItem.label">
            </div>

            <div>
                <h6>項目の種類</h6>
                <select v-model="editableItem.type">
                    <option value="text">テキスト入力欄</option>
                    <option value="check">チェックボックスリスト</option>
                    <option value="radio">ラジオボタンリスト</option>
                </select>
            </div>

            <div>
                <label>
                    <input type="checkbox">
                    <span>必須項目</span>
                </label>
            </div>

            <template v-if="editableItem.type == 'text'">
                <div>
                    <h6>正規表現</h6>
                    <input type="text" v-model="editableItem.validation.pattern">
                </div>
            </template>

            <template v-if="editableItem.type == 'text'">
                <div>
                    <h6>パターン不一致時に表示するエラーメッセージ</h6>
                    <input type="text" v-model="editableItem.validation.errorMessage">
                </div>
            </template>

            <template v-if="editableItem.type == 'radio' || editableItem.type == 'check'">
                <div>
                    <div class="d-grid gap-2 d-md-flex">
                        <h6>選択項目</h6>
                        <button class="btn btn-outline-success me-md-2">追加</button>
                    </div>
                    <div class="d-grid gap-2">
                        <div v-for="option in editableItem.items">
                            <button type="button" class="btn btn-outline-secondary">{{option.label}}</button>    
                        <!-- <div>{{option.label}}</diV> -->
                            <!-- <input v-model="option.label"> -->
                        </div>
                    </div>
                </div>
            </template>

            <button class="btn btn-primary" @click="onApply">適用</button>
            <button class="btn btn-danger" @click="onRemove">削除</button>

        </div>


    `
}