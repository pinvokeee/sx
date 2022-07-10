const sheetData = 
{
    title: "",
    items:
    [
        {
            label: "番号",
            type: "text",
            isRequired: true,
            validation:
            {
                pattern: "^\\d{6}[-]\\d+$",
                errorMessage: "正しい形式で入力してください"
            },
        },

        {
            id: 0,
            label: "チェックボックステスト",
            type: "radio",
            isRequired: true,
            items:
            [
                { 
                    label: "あいうえお" 
                },
                { 
                    label: "かきくけこ",                            
                    items:
                    [
                        {
                            label: "AAAABBB",
                            type: "check",
                            isRequired: true,
                            items:
                            [
                                {
                                    label: "TEST",
                                    items:
                                    [
                                        {
                                            label: "TEST2",
                                            type: "radio",
                                            items:
                                            [
                                                {
                                                    label: "子要素1",
                                                },

                                                {
                                                    label: "子要素2",
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { 
                    label: "さしすせそ",
                    items:
                    [
                        {
                            label: "TESTBVA",
                            type: "check",
                            isRequired: true,
                            items:
                            [
                                {
                                    label: "テストaaaaa",
                                    items:
                                    [
                                        {
                                            label: "dwadwadawdwadwadaw",
                                            type: "check",
                                            isRequired: true,
                                            items:
                                            [
                                                {
                                                    label: "TEST",
                                                }
                                            ]
                                        }
                                    ]
                                },

                                {
                                    label: "あいうえおかきくけこわおん"
                                }
                            ]
                        }
                    ]
                },
            ],
        },
    ]
}