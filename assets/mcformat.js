const MCFormat = {
    // 颜色代码映射
    colors: {
        '0': '#000000',
        '1': '#0000AA',
        '2': '#00AA00',
        '3': '#00AAAA',
        '4': '#AA0000',
        '5': '#AA00AA',
        '6': '#FFAA00',
        '7': '#AAAAAA',
        '8': '#555555',
        '9': '#5555FF',
        'a': '#55FF55',
        'b': '#55FFFF',
        'c': '#FF5555',
        'd': '#FF55FF',
        'e': '#FFFF55',
        'f': '#ffffff'
    },
    // 格式代码映射
    formats: {
        'l': 'bold',
        'm': 'strike',
        'n': 'underline',
        'o': 'italic',
        'r': 'reset'
    },
    // 解析方法
    parse(text, formatChar = '§') {
        let currentStyles = [];
        let result = "";
        const tokens = text.split(new RegExp(`(${formatChar}[0-9a-fklmnor])`, 'i'));

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.startsWith(formatChar)) {
                // 获取格式化代码（去掉格式头后的部分）
                const code = token.slice(1).toLowerCase();
                if (this.colors[code]) {
                    // 颜色代码
                    currentStyles = currentStyles.filter(style => !style.startsWith('color:'));
                    currentStyles.push(`color:${this.colors[code]}`);
                } else if (this.formats[code]) {
                    // 格式代码
                    const format = this.formats[code];
                    if (format === 'reset') {
                        currentStyles = [];
                    } else {
                        const index = currentStyles.indexOf(format);
                        if (index === -1) {
                            currentStyles.push(format);
                        } else {
                            currentStyles.splice(index, 1);
                        }
                    }
                }
            } else {
                // 应用当前样式到文本
                let styledText = token;
                currentStyles.forEach(style => {
                    if (style === 'bold') {
                        // 使用text-shadow实现加粗效果
                        styledText = `<span style="text-shadow: 1px 0 0 currentColor;">${styledText}</span>`;
                    }
                    else if (style === 'strike') styledText = `<strike>${styledText}</strike>`;
                    else if (style === 'underline') styledText = `<u>${styledText}</u>`;
                    else if (style === 'italic') styledText = `<i>${styledText}</i>`;
                    else if (style.startsWith('color:')) styledText = `<span style="${style};">${styledText}</span>`;
                });
                result += styledText;
            }
        }

        return result.replace(/\n/g, '<br>');
    }
};