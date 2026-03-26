# Ipswich Town FC Asset Checklist (Import-Style)

I have refactored all components to use **local asset imports**. This means you just need to place the files with the names below into `src/assets/`, and the site will automatically use them.

## 1. Hero Section (Carousel)
*Location: `src/components/Hero.jsx`*
| Import Name | Filename | Description / Context |
| :--- | :--- | :--- |
| `heroSlide1` | **`hero-match-preview.jpg`** | Match Action: Town v Liverpool |
| `heroSlide2` | **`hero-mckenna-contract.jpg`** | Kieran McKenna Portrait |
| `heroSlide3` | **`hero-away-kit.jpg`** | Player in new Away Kit |

## 2. Town TV (Media Grid)
*Location: `src/components/MediaGrid.jsx`*
| Import Name | Filename | Description / Context |
| :--- | :--- | :--- |
| `videoThumb1` | **`video-thumb-highlights.jpg`**| Extended Highlights thumbnail |
| `videoThumb2` | **`video-thumb-mckenna.jpg`** | McKenna Interview thumbnail |
| `videoThumb3` | **`video-thumb-training.jpg`** | Training Session thumbnail |
| `videoThumb4` | **`video-thumb-nunez.jpg`**| Player Profile thumbnail |

## 3. Latest News (Matrix)
*Location: `src/components/LatestNews.jsx`*
| Import Name | Filename | Description / Context |
| :--- | :--- | :--- |
| `newsFeatured`| **`news-featured-mckenna.jpg`**| Large Headline: McKenna Plans |
| `newsSmall1` | **`news-training-ground.jpg`** | Small: Training Facilities |
| `newsSmall2` | **`news-u21-victory.jpg`** | Small: Academy Win |
| `newsSmall3` | **`news-tickets.jpg`** | Small: Ticket Information |

## 4. Commercial Partners
*Location: `src/components/Partner.jsx`*
| Import Name | Filename | Description / Context |
| :--- | :--- | :--- |
| `principalPartnerLogo` | **`principal-partner.svg`** | EasyMarkets or current main logo |
| `sponsorLogo1` | **`sponsor-adidas.svg`** | Adidas Logo |
| `sponsorLogo2` | **`sponsor-nike.svg`** | Nike Logo |
| `sponsorLogo3` | **`sponsor-puma.svg`** | Puma Logo |
| `sponsorLogo4` | **`sponsor-ebay.svg`** | eBay Logo |
| `sponsorLogo5` | **`sponsor-spotify.svg`** | Spotify Logo |
| `sponsorLogo6` | **`sponsor-paypal.svg`** | PayPal Logo |

## Instructions
1. Save your files in `src/assets/` using the **Filename** exactly as written above.
2. The project uses Vite, so the build might show errors until these files exist.
3. Once the files are present, the page will refresh automatically.
