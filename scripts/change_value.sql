UPDATE RecommedationSlon
SET
	price_standart =
        CASE
        	WHEN price_standart LIKE '%тыс' OR price_standart LIKE '%%тыс' THEN CONCAT(REPLACE(price_standart, 'тыс', '000'), '₽')
            WHEN price_standart LIKE '%тыс₽' OR price_standart LIKE '%%тыс₽' THEN REPLACE(price_standart, 'тыс', '000')
            WHEN price_standart LIKE '%,%тыса' OR price_standart LIKE '%%,%тыса' THEN CONCAT(REPLACE(REPLACE(price_standart, 'тыса', ''), ',', ''), '00₽')
            WHEN price_standart LIKE '%,%тыс' OR price_standart LIKE '%%,%тыс' THEN CONCAT(REPLACE(REPLACE(price_standart, 'тыс', ''), ',', ''), '00₽')
            WHEN price_standart LIKE '%,%тыса₽' OR price_standart LIKE '%%,%тыса₽' THEN REPLACE(REPLACE(price_standart, 'тыса', ''), ',', '')
            WHEN price_standart LIKE '%,%тыс₽' OR price_standart LIKE '%%,%тыс₽' THEN REPLACE(REPLACE(price_standart, 'тыс', ''), ',', '')
            WHEN price_standart LIKE '%тыса' OR price_standart LIKE '%%тыса' THEN CONCAT(REPLACE(price_standart, 'тыса', '000'), '₽')
            WHEN price_standart LIKE '%тыса₽' OR price_standart LIKE '%%тыса₽' THEN REPLACE(price_standart, 'тыса', '000')
            WHEN price_standart GLOB '^[0-9]+' THEN CONCAT(price_standart, '₽')
            WHEN TRY_CAST(price_standart AS DECIMAL) IS NOT NULL THEN CONCAT(price_standart, '₽')
            ELSE "2000₽"
        END,
    price_now =
        CASE
            WHEN price_now LIKE '%тыс' OR price_now LIKE '%%тыс' THEN CONCAT(REPLACE(price_now, 'тыс', '000'), '₽')
            WHEN price_now LIKE '%тыс₽' OR price_now LIKE '%%тыс₽' THEN REPLACE(price_now, 'тыс', '000')
            WHEN price_now LIKE '%,%тыса' OR price_now LIKE '%%,%тыса' THEN CONCAT(REPLACE(REPLACE(price_now, 'тыса', ''), ',', ''), '00₽')
            WHEN price_now LIKE '%,%тыс' OR price_now LIKE '%%,%тыс' THEN CONCAT(REPLACE(REPLACE(price_now, 'тыс', ''), ',', ''), '00₽')
            WHEN price_now LIKE '%,%тыса₽' OR price_now LIKE '%%,%тыса₽' THEN REPLACE(REPLACE(price_now, 'тыса', ''), ',', '')
            WHEN price_now LIKE '%,%тыс₽' OR price_now LIKE '%%,%тыс₽' THEN REPLACE(REPLACE(price_now, 'тыс', ''), ',', '')
            WHEN price_now LIKE '%тыса' THEN CONCAT(REPLACE(price_now, 'тыса', '000'), '₽')
            WHEN price_now LIKE '%тыса₽' OR price_now LIKE '%%тыса₽' THEN REPLACE(price_now, 'тыса', '000')
            WHEN TRY_CAST(price_now AS DECIMAL) IS NOT NULL THEN CONCAT(price_now, '₽')
            ELSE "2000₽"
        END;