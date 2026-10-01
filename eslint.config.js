import eslintConfigPrettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
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
      '@typescript-eslint/consistent-type-imports': 'off',
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
