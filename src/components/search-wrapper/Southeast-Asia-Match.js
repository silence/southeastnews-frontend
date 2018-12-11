/**
 *  @param {Array} languages
 *  @return {Array} match time complexity is O(n)
 */
export default function SoutheastAsiaMatch(languages) {
    const results = []
    const SouthEastAsia = [
        { label: '文莱语', value: 'Brunei' },
        { label: '柬埔寨语', value: 'Cambodia' },
        { label: '印度尼西亚语', value: 'Indonesia' },
        { label: '老挝语', value: 'Laos' },
        { label: '马来西亚语', value: 'Malaysia' },
        { label: '缅甸语', value: 'Myanmar' },
        { label: '菲律宾语', value: 'Philippines' },
        { label: '泰语', value: 'Thailand' },
        { label: '越南语', value: 'Vietnam' }
    ]
    const map = new Map()
    SouthEastAsia.map((value, index) => {
        map.set(value.value, index)
    })
    Object.keys(languages).map(value => {
        if (map.has(value)) {
            results.push(SouthEastAsia[map.get(value)])
        }
    })
    return results
}
