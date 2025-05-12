<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>Каталог товаров</title>
      </head>
      <body>
        <h1>Каталог товаров</h1>
        <table>
          <tr>
            <th>Изображение</th>
            <th>Название</th>
            <th>Цена (BYN)</th>
            <th>Описание</th>
          </tr>
          <xsl:for-each select="catalog/product">
            <tr>
              <td><img src="{image}" alt="{name}"/></td>
              <td><xsl:value-of select="name"/></td>
              <td><xsl:value-of select="price"/></td>
              <td><xsl:value-of select="description"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>