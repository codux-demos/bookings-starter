import VarsClasses from './vars-classes.module.scss';
import { createBoard } from '@wixc3/react-board';
import StyleGuide_board_module from './style-guide.board.module.scss';
import Classnames from 'classnames';
import SectionSvg from '../../../assets/svg/section.svg';
import CommonStyles_module from '../../../styles/common-styles.module.scss';

export default createBoard({
    name: 'StyleGuide',
    Board: () => (
        <div className={Classnames(StyleGuide_board_module.root)}>
            <div className={StyleGuide_board_module.pageHeader}>
                <h1 className={StyleGuide_board_module.TitleHeader}>Style Guide</h1>
                <span className={StyleGuide_board_module.logo}>Booking - Yoga</span>
            </div>
            <div className={StyleGuide_board_module.SectionContainer}>
                <div className={StyleGuide_board_module.SectionTitle}>
                    <img src={SectionSvg} />
                    <h2>Typography</h2>
                </div>
                <p className={StyleGuide_board_module.SectionSubtitle}>
                    Defines the fonts used for headings, body text, labels, etc., including size,
                    weight, and spacing.
                </p>
            </div>
            <div className={StyleGuide_board_module.subsectionContainer}>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Font Family</h2>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div className={StyleGuide_board_module.FontFamilyContainer}>
                        <span className={StyleGuide_board_module.FontFamilyAa}>Aa</span>
                        <span className={Classnames(VarsClasses.pNormal)}>DM Sans</span>
                    </div>
                </div>
            </div>
            <div className={StyleGuide_board_module.subsectionContainer}>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Main Heading / h1</h2>
                <div className={StyleGuide_board_module.grid}>
                    <div>
                        <h1
                            className={Classnames(
                                VarsClasses['extra-large-thin-title'],
                                StyleGuide_board_module.margin,
                            )}
                        >
                            Cover thin
                        </h1>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            extra-large-thin-title
                            <br />
                            100 65px/1.2
                        </div>
                    </div>
                    <div>
                        <h1
                            className={Classnames(
                                VarsClasses.h1Normal,
                                StyleGuide_board_module.margin,
                                VarsClasses['large-thin-title'],
                            )}
                        >
                            Best Sellers
                        </h1>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            large-thin-title
                            <br />
                            100 45px/1.4
                        </div>
                    </div>
                </div>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Subheading / h2</h2>
                <div className={StyleGuide_board_module.grid}>
                    <div>
                        <p
                            className={Classnames(
                                VarsClasses['extra-large-text'],
                                StyleGuide_board_module.margin,
                            )}
                        >
                            Extra large
                        </p>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            extra-large-text
                            <br />
                            400 60px/1.4
                        </div>
                    </div>
                    <div>
                        <h2
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['large-title'],
                            )}
                        >
                            Large Subtitle
                        </h2>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            large-title
                            <br />
                            400 45px/1.4
                        </div>
                    </div>
                    <div>
                        <h2
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['large-title-mobile'],
                            )}
                        >
                            Large Subtitle Mobile{' '}
                        </h2>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            h2Normal
                            <br />
                            400 30px/1.4
                        </div>
                    </div>
                </div>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Body / p</h2>
                <div className={StyleGuide_board_module.grid}>
                    <div>
                        <p
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['large-paragraph'],
                            )}
                        >
                            Large
                        </p>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            large-paragraph
                            <br />
                            400 52px/1.6
                        </div>
                    </div>
                    <div>
                        <p
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['medium-paragraph'],
                            )}
                        >
                            Medium
                        </p>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            medium-paragraph
                            <br />
                            400 34px/1.4
                        </div>
                    </div>
                    <div>
                        <p
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['medium-paragraph-bold'],
                            )}
                        >
                            Medium bold
                        </p>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            medium-paragraph-bold
                            <br />
                            1000 42px/1.4
                        </div>
                    </div>
                </div>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Smaller Text</h2>
                <div className={StyleGuide_board_module.grid}>
                    <div>
                        <p
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['extra-small-title'],
                            )}
                        >
                            Extra small title
                        </p>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            extra small title
                            <br />
                            700 11px/1.4
                        </div>
                    </div>
                    <div>
                        <p
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['small-text-font-bold'],
                            )}
                        >
                            Small bold
                        </p>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            small-text-font-bold
                            <br />
                            1000 24px/1.4
                        </div>
                    </div>
                    <div>
                        <p
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['small-text'],
                            )}
                        >
                            Small text
                        </p>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            small-text
                            <br />
                            400 16px/1.4
                        </div>
                    </div>
                    <div>
                        <p
                            className={Classnames(
                                StyleGuide_board_module.margin,
                                VarsClasses['extra-small-text'],
                            )}
                        >
                            Etra small
                        </p>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            extra-small-text
                            <br />
                            400 12px/1.45
                        </div>
                    </div>
                </div>
            </div>
            <div className={StyleGuide_board_module.SectionContainer}>
                <div className={StyleGuide_board_module.SectionTitle}>
                    <img src={SectionSvg} />
                    <h2>Colors</h2>
                </div>
                <p className={StyleGuide_board_module.SectionSubtitle}>
                    Colors are a powerful tool in design for communicating meaning and influencing
                    user perception. Here&apos;s colors can contribute to the success of your design
                    by conveying specific
                </p>
            </div>
            <div className={StyleGuide_board_module.subsectionContainer}>
                <h2 className={StyleGuide_board_module.subSectionTitle}>
                    Primary / Black and White
                </h2>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.colorContainer,
                                VarsClasses.white,
                            )}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            white
                            <br />
                            #FFFFFF
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.colorContainer,
                                VarsClasses.snowWhite,
                            )}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            snow-white
                            <br />
                            #f5f5f5
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.colorContainer,
                                VarsClasses.black,
                            )}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            balck
                            <br />
                            #000000
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.colorContainer,
                                VarsClasses.charcoalBlack,
                            )}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            charcoalBlack
                            <br />
                            #282b2d{' '}
                        </div>
                    </div>
                </div>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Secondary / Dark</h2>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.colorContainer,
                                CommonStyles_module.p1,
                            )}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            o1
                            <br />
                            #FF5E1A
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'd12')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            d20
                            <br /> #AFAFB6
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'd30')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            d30
                            <br />
                            #808087
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'd40')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            d40
                            <br />
                            #2B2B31{' '}
                        </div>
                    </div>
                </div>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Warning </h2>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'w10')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            w10
                            <br />
                            #FEF4E9
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'w20')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            w20
                            <br />
                            #FCD0A0
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'w30')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            w30
                            <br />
                            ##FABF7A
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'w40')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            w40
                            <br />
                            #2B2B31{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'w50')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            w40
                            <br />
                            #AA661E{' '}
                        </div>
                    </div>
                </div>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Error</h2>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'e10')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            e10
                            <br />
                            #feecec
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'e20')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            e20
                            <br />
                            #fab2af
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'e30')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            e30
                            <br />
                            #f26561
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'e40')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            e40
                            <br />
                            #ec6d69{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 'e50')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            e50
                            <br />
                            #a5302c{' '}
                        </div>
                    </div>
                </div>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Success</h2>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 's10')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            s0
                            <br />
                            #E8F8F1
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 's20')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            s20
                            <br />
                            #9FE1C2
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 's30')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            s30
                            <br />
                            #76D6AB
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 's40')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            s40
                            <br />
                            #76D6AB{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(StyleGuide_board_module.colorContainer, 's50')}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>
                            s50
                            <br />
                            #0F804E{' '}
                        </div>
                    </div>
                </div>
            </div>
            <div className={StyleGuide_board_module.SectionContainer}>
                <div className={StyleGuide_board_module.SectionTitle}>
                    <img src={SectionSvg} />
                    <h2>Shadows</h2>
                </div>
                <p className={StyleGuide_board_module.SectionSubtitle}>
                    Shadows help create the illusion of depth and dimension in a flat, 2D digital
                    space. By simulating how light interacts with objects in the real world, shadows
                    visually separate elements, define their shapes, and show their relative
                    positions.
                </p>
            </div>
            <div className={StyleGuide_board_module.subsectionContainer}>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div>
                        <div
                            className={Classnames(
                                'shadow100',
                                StyleGuide_board_module.shadowContainer,
                            )}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>shadow100</div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                'shadow200',
                                StyleGuide_board_module.shadowContainer,
                            )}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>shadow200</div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                'shadow300',
                                StyleGuide_board_module.shadowContainer,
                            )}
                        />
                        <div className={StyleGuide_board_module.subtitleValue}>shadow300</div>
                    </div>
                </div>
            </div>
            <div className={StyleGuide_board_module.SectionContainer}>
                <div className={StyleGuide_board_module.SectionTitle}>
                    <img src={SectionSvg} />
                    <h2>Spacing</h2>
                </div>
                <p className={StyleGuide_board_module.SectionSubtitle}>
                    Spacing is a crucial element in design systems, as it dictates the negative
                    space or &quot;white space&quot; between UI components. This space plays a
                    significant role in visual Hierarchy, Aesthetics and Balance.
                </p>
            </div>
            <div className={StyleGuide_board_module.subsectionContainer}>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Margin</h2>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div>
                        <div className={StyleGuide_board_module.marginContainer}>
                            <div
                                className={Classnames(
                                    StyleGuide_board_module.spacingBox,
                                    'margin2',
                                )}
                            />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            margin2
                            <br />
                            2px{' '}
                        </div>
                    </div>
                    <div>
                        <div className={StyleGuide_board_module.marginContainer}>
                            <div
                                className={Classnames(
                                    'margin4',
                                    StyleGuide_board_module.spacingBox,
                                )}
                            />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            margin4
                            <br />
                            4px{' '}
                        </div>
                    </div>
                    <div>
                        <div className={StyleGuide_board_module.marginContainer}>
                            <div
                                className={Classnames(
                                    StyleGuide_board_module.spacingBox,
                                    'margin6',
                                )}
                            />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            margin6
                            <br />
                            6px{' '}
                        </div>
                    </div>
                    <div>
                        <div className={StyleGuide_board_module.marginContainer}>
                            <div
                                className={Classnames(
                                    StyleGuide_board_module.spacingBox,
                                    'margin12',
                                )}
                            />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            margin12
                            <br />
                            12px{' '}
                        </div>
                    </div>
                    <div>
                        <div className={StyleGuide_board_module.marginContainer}>
                            <div
                                className={Classnames(
                                    StyleGuide_board_module.spacingBox,
                                    'margin16',
                                )}
                            />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            margin16
                            <br />
                            16px{' '}
                        </div>
                    </div>
                    <div>
                        <div className={StyleGuide_board_module.marginContainer}>
                            <div
                                className={Classnames(
                                    StyleGuide_board_module.spacingBox,
                                    'margin24',
                                )}
                            />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            margin24
                            <br />
                            24px{' '}
                        </div>
                    </div>
                    <div>
                        <div className={StyleGuide_board_module.marginContainer}>
                            <div
                                className={Classnames(
                                    StyleGuide_board_module.spacingBox,
                                    'margin32',
                                )}
                            />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            margin32
                            <br />
                            32px{' '}
                        </div>
                    </div>
                    <div>
                        <div className={StyleGuide_board_module.marginContainer}>
                            <div
                                className={Classnames(
                                    StyleGuide_board_module.spacingBox,
                                    'margin40',
                                )}
                            />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            margin40
                            <br />
                            40px{' '}
                        </div>
                    </div>
                </div>
                <h2 className={StyleGuide_board_module.subSectionTitle}>Padding</h2>
                <div className={StyleGuide_board_module.FlexContainer}>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.paddingContainer,
                                'padding2',
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding2
                            <br />
                            2px{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                'padding4',
                                StyleGuide_board_module.paddingContainer,
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding4
                            <br />
                            4px{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.paddingContainer,
                                'padding6',
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding6
                            <br />
                            6px{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.paddingContainer,
                                'padding8',
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding8
                            <br />
                            8px{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.paddingContainer,
                                'padding12',
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding12
                            <br />
                            12px{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.paddingContainer,
                                'padding16',
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding16
                            <br />
                            16px{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.paddingContainer,
                                'padding24',
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding24
                            <br />
                            24px{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.paddingContainer,
                                'padding32',
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding32
                            <br />
                            32px{' '}
                        </div>
                    </div>
                    <div>
                        <div
                            className={Classnames(
                                StyleGuide_board_module.paddingContainer,
                                'padding40',
                            )}
                        >
                            <div className={StyleGuide_board_module.spacingBox} />
                        </div>
                        <div className={StyleGuide_board_module.subtitleValue}>
                            padding40
                            <br />
                            40px{' '}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    isSnippet: true,
    environmentProps: {
        windowWidth: 1014,
        canvasWidth: 1021,
        canvasHeight: 1576,
        windowHeight: 1659,
    },
});
