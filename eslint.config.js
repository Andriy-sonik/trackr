import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', 'coverage/', '.nuxt/', '.output/'],
  },

  eslint.configs.recommended,

  ...tseslint.configs.recommended,

  ...eslintPluginVue.configs['flat/recommended'],

  {
    files: ['**/*.{js,ts,vue}'],

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'vue/multi-word-component-names': 'off',

      'vue/no-mutating-props': 'error',

      'vue/no-unused-vars': 'warn',

      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1,
          multiline: 1,
        },
      ],
    },
  },

  eslintConfigPrettier,
)
