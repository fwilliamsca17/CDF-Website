# SEO Visibility Apply — https://www.capitaldf.com

**Date:** 2026-08-01  
**SOP:** GIG `docs/CLIENT-SEO-VISIBILITY-SOP.md`  
**Label:** CDF  

## Changes this pass

- robots: add Host (preferred production host)
- llms.txt: added where missing (WCG, Next Move)

## Post-deploy verify

```bash
curl -sL https://www.capitaldf.com/robots.txt | rg -n 'Host:|Sitemap:|GPTBot'
curl -sI -A GPTBot https://www.capitaldf.com/ | head -5
curl -sL https://www.capitaldf.com/llms.txt | head -10
```
