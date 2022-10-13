import { useTranslation } from 'react-i18next';

import { Languages, supportedLanguages } from '@/locales/i18n';
import isMobile from '@/utils/is-mobile';

import { MenuItem, NativeSelect, Select } from './styled';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const currentLanguage = supportedLanguages.find((lang) => lang.code === i18n.language);

  if (isMobile) {
    return (
      <NativeSelect
        defaultValue={currentLanguage?.code ?? Languages.enUS}
        onChange={(e) => i18n.changeLanguage(e.target.value as string)}
        variant="filled"
        size="small"
      >
        {supportedLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} &nbsp; {language.name}
          </option>
        ))}
      </NativeSelect>
    );
  }
  return (
    <Select
      defaultValue={currentLanguage?.code ?? Languages.enUS}
      onChange={(e) => i18n.changeLanguage(e.target.value as string)}
      variant="filled"
      size="small"
    >
      {supportedLanguages.map((language) => (
        <MenuItem key={language.code} value={language.code}>
          {language.flag} &nbsp; {language.name}
        </MenuItem>
      ))}
    </Select>
  );
}
export default LanguageSelector;
